import{av as I,V as w,j as t,p as k,S as b,cb as j,cf as x,ch as g,cc as u,Y as y,cv as _}from"./iframe-D2Aj6zCc.js";import{w as m,c as D}from"./ContextDecorators-BZzbP-oQ.js";import{F as v,A as N}from"./FullførtStilling-CZjEOgKa.js";import{R as T}from"./GjenåpneStillingKnapp-Bsxya4iE.js";import{T as A}from"./TilgangskontrollForInnhold-BloNXssh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CVo3Jh_C.js";import"./OrganisasjonsnummerAlert-DtVWcYdv.js";import"./VStack-C0px-8ON.js";import"./BasePrimitive-CZCCzmpl.js";import"./List-C17jiTC3.js";import"./Link-BbRR72Sv.js";import"./KandidatHendelseTag-BOKN8pZD.js";import"./Tag-BU7LP8ol.js";import"./ChatExclamationmark-BzDF83HB.js";import"./FileXMark-D5IziqHB.js";import"./Trash-C9VAgQTp.js";import"./HandShakeHeart-CuGj1GWQ.js";import"./Calendar-BN12mNGQ.js";import"./ThumbUp-4qBtJy8A.js";import"./Table-DP4ODOfN.js";import"./util-B3R4WQ-U.js";import"./format-D5lxIe5p.js";import"./match-kaY1zcGg.js";import"./parse-slG2HzgA.js";import"./getDefaultOptions-PtjhHLpX.js";import"./parseISO-DD7vKl-q.js";import"./index-DKGEBeCX.js";import"./index-B40KJ5b4.js";import"./isBefore-Db0eRYon.js";import"./util-CMYs9b3j.js";import"./accordion-BftC39iE.js";import"./index-03WoT5EN.js";import"./index-B2DHxw2L.js";import"./index-DKpqn2bG.js";import"./ChevronDown-DjuBD2or.js";import"./Box-B5J3T4DW.js";import"./Bell-BnGDKr1z.js";import"./PersonChat-C54QjL9u.js";import"./Eye-DAKVpOUc.js";import"./ProgressBar-DEh6RkjK.js";import"./EyeSlash-DQyv-ZCh.js";import"./CircleSlash-BA4IDRzm.js";import"./Modal-BEt4rWb7.js";import"./floating-ui.react-C0SACjvL.js";import"./Date.Input-_LQLW8wr.js";import"./ReadOnlyIcon-P8HRj0bA.js";import"./useFormField-DclvFkpD.js";import"./useControllableState-Bhz5eiw1.js";import"./Modal.context-DAf4bnRZ.js";import"./Checkbox-Dq5hwvoN.js";import"./Fieldset-DXwFotJs.js";import"./Pencil-Dz_CDJN7.js";import"./PersonbrukerTekst-B-ufPG4j.js";import"./ClockDashed-u1J2bIFL.js";import"./Tasklist-CxOFUQZw.js";import"./ErrorBoundary-Dr_wRgSZ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(b,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===x.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(v,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(N,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Gt as default};
