import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-CQ6vvEeK.js";import{w as m,c as A}from"./ContextDecorators-DyzBdEdC.js";import{F as N,A as v}from"./FullførtStilling-YxhiVn71.js";import{R as T}from"./GjenåpneStillingKnapp-Dh-Rh9pV.js";import{T as D}from"./TilgangskontrollForInnhold-BlZYkgRP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKszYbKO.js";import"./OrganisasjonsnummerAlert-BmxN11Mr.js";import"./VStack-ChM420R4.js";import"./BasePrimitive-BXoVEjCk.js";import"./List--EevA5Ol.js";import"./Link-x4iWrhKq.js";import"./KandidatHendelseTag-DLSYsUU6.js";import"./Tag-a5dvz4kl.js";import"./ChatExclamationmark-tt-RHu41.js";import"./FileXMark-Cky77w8Z.js";import"./Trash-DAs8orv7.js";import"./HandShakeHeart-JGxqHzHK.js";import"./Calendar-ZplbI33s.js";import"./ThumbUp-wH43M9I4.js";import"./Table-B30Jb__B.js";import"./util-B53mYrdJ.js";import"./parse-D-IkhgM-.js";import"./getDefaultOptions-N4tXrMdT.js";import"./parseISO-ByaoA-27.js";import"./index-DjwqnLDo.js";import"./index-B40KJ5b4.js";import"./isBefore-BhwUETve.js";import"./util-BJHpjWP_.js";import"./accordion-fCfZ9ESm.js";import"./index-TPowhhr6.js";import"./index-B1ZKFfiO.js";import"./index-BFayxCFf.js";import"./ChevronDown-CH8VYIJt.js";import"./Box-DtAaynCt.js";import"./Bell-CCPJmYM4.js";import"./PersonChat-Doo-wgws.js";import"./Eye-zWZRu_eI.js";import"./ProgressBar-wUhssAgu.js";import"./EyeSlash-CJXAlN1j.js";import"./CircleSlash-XREgUtzt.js";import"./Modal-CiBzigW7.js";import"./floating-ui.react-q6qfomDA.js";import"./Date.Input-Lk24Z0xI.js";import"./useFormField-BWgTqZvY.js";import"./useControllableState-B4ZbH_WK.js";import"./Modal.context-BLjCIKII.js";import"./Checkbox-DVsKse6K.js";import"./Fieldset-BV4FrI-G.js";import"./Pencil-DsceKG-I.js";import"./PersonbrukerTekst-KDbgE_s4.js";import"./ClockDashed-BCXr7pb6.js";import"./Tasklist-CkgcuBKK.js";import"./ErrorBoundary-DyxF9XZe.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
