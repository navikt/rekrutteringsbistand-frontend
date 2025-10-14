import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-pQ4IQbGd.js";import{w as d,c as D}from"./ContextDecorators-BtQxLkw0.js";import{F as N,A as v}from"./FullførtStilling-RGLvrF38.js";import{R as T}from"./GjenåpneStillingKnapp-Q6P33UB3.js";import{T as A}from"./TilgangskontrollForInnhold-CaY1QrZ3.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-QnKNStzm.js";import"./OrganisasjonsnummerAlert-7NDzGfnf.js";import"./VStack-DCwu5_pW.js";import"./BasePrimitive-Db3km7WY.js";import"./List-CRwxmV1Z.js";import"./Link-Cx_LZd61.js";import"./KandidatHendelseTag-DUUh8yuE.js";import"./Tag-D1pqY_tH.js";import"./FileXMark-B_5gfR1M.js";import"./Trash-BN6yFfVZ.js";import"./HandShakeHeart-BJ53oCDN.js";import"./Calendar-DuIFoI5R.js";import"./ThumbUp-DM0TdOgK.js";import"./Table-lIFth0jT.js";import"./util-D4CPxTyr.js";import"./format-B0ppLWNW.js";import"./match-C-7WFcLy.js";import"./parseISO-C-w9YAiP.js";import"./parse-Bt8DAopY.js";import"./getDefaultOptions-DwHW2o_l.js";import"./util-XB808C3G.js";import"./accordion-tUYpUgd2.js";import"./index-DcfxXCIV.js";import"./index-BFR3_Kx-.js";import"./index-DwQ-WsvP.js";import"./ChevronDown-D6jbIK8C.js";import"./Box-CZXqLRlZ.js";import"./Bell-61i-iFn8.js";import"./PersonChat-ItIwxeLz.js";import"./Eye-Bjc5iuwv.js";import"./ProgressBar-CT9isSyF.js";import"./EyeSlash-hIhxFBNj.js";import"./CircleSlash-Bg6gPoQ5.js";import"./Modal-9VfEtu-c.js";import"./floating-ui.react-BD46vR57.js";import"./Date.Input-V8JeOMI_.js";import"./useFormField-Bw12XLYN.js";import"./useControllableState-CnnhnPcF.js";import"./Modal.context-Cgn_yqR3.js";import"./Checkbox-DZcRyWob.js";import"./Fieldset-D_6v4t6l.js";import"./Pencil-DMe2_GdA.js";import"./PersonbrukerTekst-CzI-8MVb.js";import"./ClockDashed-BrKaWo9z.js";import"./Tasklist-Co1nJSb4.js";import"./ErrorBoundary-BYZREd1N.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
