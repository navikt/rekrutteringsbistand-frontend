import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-COgBtDGK.js";import{w as m,c as D}from"./ContextDecorators-DDFmJ6Lm.js";import{F as N,A as v}from"./FullførtStilling-TEqNrgOn.js";import{R as T}from"./GjenåpneStillingKnapp-BbfRJhS1.js";import{T as A}from"./TilgangskontrollForInnhold-mTjGDy7o.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BT1IvZO-.js";import"./OrganisasjonsnummerAlert-D6USNHN1.js";import"./VStack-Dgyxm1dh.js";import"./BasePrimitive-DvD-32Tp.js";import"./List-BFBnVhoE.js";import"./Link-n08tJgBH.js";import"./KandidatHendelseTag-DbK6GcHx.js";import"./Tag-CJY0PnxR.js";import"./ChatExclamationmark-CRFEpTjS.js";import"./FileXMark-BVAq9xL2.js";import"./Trash-tgTqNADo.js";import"./HandShakeHeart-CDQq8RCR.js";import"./Calendar-Dvccs2fA.js";import"./ThumbUp-juI5huSc.js";import"./Table-Bf9-HaFJ.js";import"./util-DaF0eFxC.js";import"./format-Bjv3Zmuc.js";import"./match-DP84vVhp.js";import"./parse-CShcNZWD.js";import"./getDefaultOptions-B5vsIIWS.js";import"./parseISO-DQplc_F1.js";import"./util-BsgEYL50.js";import"./accordion-Bp1LwpK7.js";import"./index-CLaT2VIw.js";import"./index-DI-3pXZB.js";import"./index-CIiP6Umq.js";import"./ChevronDown-BBOTSGi1.js";import"./Box-DXE_89d3.js";import"./Bell-DoQggkbX.js";import"./PersonChat-v6WhrtAG.js";import"./Eye-CFBJk2FQ.js";import"./ProgressBar-CN8HZRLW.js";import"./EyeSlash-DpwKFFdL.js";import"./CircleSlash-Db8vEYbM.js";import"./Modal-C4wcq4dg.js";import"./floating-ui.react-SVUjMJpY.js";import"./Date.Input-CSrBc5nm.js";import"./useFormField-DF-0UKIt.js";import"./useControllableState-DDAZjlVK.js";import"./Modal.context-BuPf6RVG.js";import"./Checkbox-BJoFkw4b.js";import"./Fieldset-d_cNGYBe.js";import"./Pencil-o6mS4cuK.js";import"./PersonbrukerTekst-CS29thOQ.js";import"./ClockDashed-bNUo5lel.js";import"./Tasklist-Brv6BwSF.js";import"./ErrorBoundary-B41IVZBb.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
