import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-BvvhrRbe.js";import{w as m,c as A}from"./ContextDecorators-BY2RNcot.js";import{F as N,A as v}from"./FullførtStilling-BCGkhSW3.js";import{R as T}from"./GjenåpneStillingKnapp-CBHNcIBh.js";import{T as D}from"./TilgangskontrollForInnhold-CPtmwmJz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BQlVPf0v.js";import"./OrganisasjonsnummerAlert-BwxqIh6L.js";import"./VStack-H-QHo1Lk.js";import"./BasePrimitive-D8FPQ7k9.js";import"./List-Cn_jzuTP.js";import"./Link-CsrhpwZn.js";import"./KandidatHendelseTag-uqkaD8lH.js";import"./Tag-SkBtSqZW.js";import"./ChatExclamationmark-Ci-T-MCf.js";import"./FileXMark-CnCHTgdq.js";import"./Trash-BFc3IcOH.js";import"./HandShakeHeart-CkRPZYE4.js";import"./Calendar-B6MdUGZp.js";import"./ThumbUp-CwHeVLTC.js";import"./Table-BM4dW861.js";import"./util-n1hQ2AEe.js";import"./parse-D8BXf2p8.js";import"./getDefaultOptions-Dik-T2FL.js";import"./parseISO-C5Lmk-lV.js";import"./index-DvcJyemQ.js";import"./index-B40KJ5b4.js";import"./isBefore-COw2UKUc.js";import"./util-IxlLFe_4.js";import"./accordion-sOsg4CBJ.js";import"./index-DL6W4kkZ.js";import"./index-D9ofE9Wu.js";import"./index-BZV6CH_k.js";import"./ChevronDown-C6Y4QFb6.js";import"./Box-BxC7AYwR.js";import"./Bell-D5retIFx.js";import"./PersonChat-CPgu8rmK.js";import"./Eye-auOiYyGe.js";import"./ProgressBar-QR2YPA_M.js";import"./EyeSlash-D9Ti4kRt.js";import"./CircleSlash-CWurDYZB.js";import"./Modal-ezHDj648.js";import"./floating-ui.react-BfNC0LZR.js";import"./Date.Input-DBxx4b9_.js";import"./useFormField-C83omxTl.js";import"./useControllableState-B5f92340.js";import"./Modal.context-BcwzVHgg.js";import"./Checkbox-BRE7uYxV.js";import"./Fieldset-8mRWN5do.js";import"./Pencil-DpzkXWuW.js";import"./PersonbrukerTekst-CjmwjQbF.js";import"./ClockDashed-CxB35etK.js";import"./Tasklist-BQruYKDy.js";import"./ErrorBoundary-BlcML5w-.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
